import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface VideoFormat {
  id: string;
  ext: string;
  resolution: string;
  filesize: string;
  vcodec: string;
  acodec: string;
  format_note: string;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: number;
  formats: VideoFormat[];
}

export async function POST(request: NextRequest) {
  try {
    const { url, formatId } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(url)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Build yt-dlp command for download
    const formatOption = formatId ? `-f ${formatId}` : '';
    const outputTemplate = '%(title)s.%(ext)s';
    const command = `yt-dlp ${formatOption} "${url}" -o "${outputTemplate}" --print filename --no-playlist`;

    // Execute yt-dlp command
    const { stdout, stderr } = await execAsync(command);

    if (stderr && !stderr.includes('WARNING')) {
      console.error('yt-dlp error:', stderr);
      return NextResponse.json(
        { error: 'Failed to process URL' },
        { status: 500 }
      );
    }

    const filename = stdout.trim();
    
    return NextResponse.json({
      success: true,
      filename,
      message: 'Download completed successfully'
    });

  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Get video info and formats using yt-dlp
    const command = `yt-dlp "${url}" --dump-json`;
    const { stdout, stderr } = await execAsync(command);

    if (stderr && !stderr.includes('WARNING')) {
      console.error('yt-dlp error:', stderr);
      return NextResponse.json(
        { error: 'Failed to get video information' },
        { status: 500 }
      );
    }

    const videoData = JSON.parse(stdout);
    
    // Extract relevant information
    const videoInfo: VideoInfo = {
      title: videoData.title || 'Unknown Title',
      thumbnail: videoData.thumbnail || '',
      duration: videoData.duration || 0,
      formats: videoData.formats?.map((format: any) => ({
        id: format.format_id,
        ext: format.ext,
        resolution: format.resolution || 'N/A',
        filesize: format.filesize ? formatFileSize(format.filesize) : 'Unknown',
        vcodec: format.vcodec || 'N/A',
        acodec: format.acodec || 'N/A',
        format_note: format.format_note || ''
      })) || []
    };

    // Filter and sort formats
    const filteredFormats = videoInfo.formats
      .filter(format => format.ext && format.ext !== 'N/A')
      .sort((a, b) => {
        // Sort by resolution (highest first)
        const resA = parseInt(a.resolution.split('x')[0]) || 0;
        const resB = parseInt(b.resolution.split('x')[0]) || 0;
        return resB - resA;
      });

    return NextResponse.json({
      success: true,
      videoInfo: {
        ...videoInfo,
        formats: filteredFormats
      }
    });

  } catch (error) {
    console.error('Get video info API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
} 