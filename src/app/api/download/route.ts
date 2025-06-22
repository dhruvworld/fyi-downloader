import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { url, format } = await request.json();

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

    // Build yt-dlp command
    const formatOption = format ? `-f ${format}` : '';
    const command = `yt-dlp ${formatOption} "${url}" --print filename --no-playlist`;

    // Execute yt-dlp command
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
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
    // Get available formats for a URL
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Get formats using yt-dlp
    const command = `yt-dlp "${url}" --list-formats`;
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      console.error('yt-dlp error:', stderr);
      return NextResponse.json(
        { error: 'Failed to get formats' },
        { status: 500 }
      );
    }

    // Parse formats from yt-dlp output
    const formats = parseFormats(stdout);

    return NextResponse.json({
      success: true,
      formats
    });

  } catch (error) {
    console.error('Get formats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function parseFormats(output: string) {
  const lines = output.split('\n');
  const formats: Array<{ id: string; ext: string; resolution: string; filesize: string }> = [];

  for (const line of lines) {
    if (line.includes('ID') && line.includes('EXT')) continue; // Skip header
    
    const match = line.match(/^(\d+)\s+(\w+)\s+(\d+x\d+|\w+)\s+(.+)$/);
    if (match) {
      formats.push({
        id: match[1],
        ext: match[2],
        resolution: match[3],
        filesize: match[4].trim()
      });
    }
  }

  return formats;
} 