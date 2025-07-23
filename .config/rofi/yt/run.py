#!/usr/bin/env python3
import subprocess
import sys

def rofi_prompt(prompt, options):
    """Show a rofi dmenu prompt with options, return the selected line or None."""
    rofi = subprocess.Popen(
        ['rofi', '-dmenu', '-i', '-p', prompt],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        text=True
    )
    stdout, _ = rofi.communicate('\n'.join(options))
    if rofi.returncode != 0 or not stdout.strip():
        return None
    return stdout.strip()

def youtube_search(query, max_results=10):
    """Use yt-dlp to search YouTube and return a list of (title, url) tuples."""
    # yt-dlp supports "ytsearchN:" syntax to search YouTube and get N results
    command = [
        'yt-dlp',
        f'ytsearch{max_results}:{query}',
        '--print', 'title',
        '--print', 'webpage_url',
        '--skip-download'
    ]
    try:
        output = subprocess.check_output(command, text=True)
    except subprocess.CalledProcessError:
        return []

    lines = output.strip().split('\n')
    # output alternates title, url, title, url...
    results = []
    for i in range(0, len(lines), 2):
        title = lines[i]
        url = lines[i+1] if i+1 < len(lines) else ''
        results.append((title, url))
    return results

def main():
    query = rofi_prompt("YouTube Search:", [])
    if not query:
        sys.exit(0)

    results = youtube_search(query)
    if not results:
        rofi_prompt("No results found. Press Enter to exit.", [])
        sys.exit(0)

    # Prepare options for rofi menu: show titles
    titles = [title for title, url in results]
    choice = rofi_prompt("Select video:", titles)
    if not choice:
        sys.exit(0)

    # Find URL for selected title
    for title, url in results:
        if title == choice:
            # Play video with mpv
            subprocess.Popen(['mpv', url])
            break

if __name__ == "__main__":
    main()

