#!/bin/bash
github_icon="\uf09b"
GITHUB_USER="Brunoaqu"

# Fetch repos using gh CLI as before
repos=$(gh repo list "$GITHUB_USER" --limit 100 --json name,url --jq '.[] | "\(.name)|\(.url)"')

# Add icon before repo name
repos_with_icons=$(echo "$repos" | while IFS="|" read -r name url; do
  echo -e "${github_icon}  $name|$url"
done)

# Show in rofi
selected_repo=$(echo "$repos_with_icons" | cut -d'|' -f1 | rofi -dmenu -i -p "GitHub Repos:" -font "FiraCode Nerd Font 12")

if [[ -n "$selected_repo" ]]; then
  repo_url=$(echo "$repos_with_icons" | grep "^$selected_repo|" | cut -d'|' -f2)
  xdg-open "$repo_url"
fi
