interface Format {
  id: string;
  ext: string;
  resolution: string;
  filesize: string;
}

export async function getFormats(url: string): Promise<Format[]> {
  try {
    const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch formats');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch formats');
    }

    return data.formats || [];
  } catch (error) {
    console.error('Error fetching formats:', error);
    throw error;
  }
} 