#!/bin/bash
session="nvim"

if ! tmux has-session -t "$session" >/dev/null 2>&1; then
	path="$HOME"
	file="$path/.config"
	tmux new-session -d -s "$session" -c "$path" -n nvim "nvim $file"
	tmux new-window -c "$path" -n "fish" fish
	# tmux new-window -c "$path" -n "git" 'LAZYGIT_GIT_COMMAND="git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME" lazygit'
	tmux select-window -t 1
fi

tmux attach-session -t "$session"
