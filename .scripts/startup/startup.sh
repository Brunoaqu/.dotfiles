#!/bin/bash

# Core components (order is important!)
(
	# nvidia-force-comp-pipeline
	# ~/.screenlayout/default_double_monitor.sh
	# ~/.screenlayout/default_double_monitor_ag.sh
	picom -b
	bash ~/.config/polybar/launch.sh --grayblocks &
) &

(
	# feh --bg-fill ~/.wallpapers/Space_Spiral_Nord.png &
	# feh --bg-fill ~/.wallpapers/wallpaper-totoro-01.png
	# feh --bg-max ~/.wallpapers/pixlog-default-02.png
	# feh --bg-fill ~/.wallpapers/berserk-001.jpg
	# feh --bg-fill ~/.wallpapers/anime-rural-001.jpg	
	# feh --bg-fill ~/.wallpapers/solarpunk-wallpaper.jpeg
	# feh --bg-fill ~/.wallpapers/wallpapers-ghost-in-the-shell.jpg
	# feh --bg-scale ~/.config/i3/wallpapers/cloudsday.jpg
	feh --bg-fill ~/.config/i3/wallpapers/space-piano.png
) &

# Services
# ~/.config/cron/update_loadshedding.sh &
# ~/.config/tmux/utils/start_all_servers.sh &
dbus-launch dunst --config ~/.config/dunst/dunstrc &
# /usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &

# Apps
# xdg-settings set default-web-browser librewolf.desktop

# Theme
# wal -i ~/.wallpapers/pixlog-default-02.png --backend xresources

# Keyboard stuff
setxkbmap -model abnt2 -layout br
xset r rate 165 50
