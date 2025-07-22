# Environment.
export TERM="st-256color"
export TERMINAL=$TERM
export COLORTERM=$TERM
export MANPAGER='nvim +Man!'
export MANWIDTH=999
export EDITOR="nvim"
export VISUAL=$EDITOR
export BAT_THEME="base16-256"
export OPENSSL_CONF="/dev/null"
export NVM_DIR="$HOME/.nvm"
export PNPM_HOME="/home/bruno/"
#export GOOGLE_APPLICATION_CREDENTIALS="~/.config/gcloud/application_default_credentials.json"

# Path
export PATH="$HOME/.local/bin/:$PATH"
export PATH="/usr/local/go/bin/:$PATH"
export PATH="$HOME/.bun/bin:$PATH"
export PATH="$HOME/.deno/bin:$PATH"
export PATH="$HOME/.local/share/coursier/bin:$PATH"
export PATH="$HOME/.cargo/env:$PATH"
export PATH="$HOME/go/bin:$PATH"
export PATH="$HOME/.local/share/coursier/bin:$PATH"
export PATH="$HOME/.istioctl/bin:$PATH"
export PATH="$HOME/.spicetify:$PATH"

# Dotfiles.
alias config='git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
alias lazygit-dotfiles='lazygit --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
alias lgd='lazygit-dotfiles'

# Aliases
alias ls='eza -lagX --icons --color=always'
alias ll='ls -l'
alias la='ls -la'
alias dotfiles='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
alias tf='terraform'
alias codium='flatpak run com.vscodium.codium'
alias gco='git checkout'
alias workspace='cd ~/github.com'
alias gcp-set-project='gcloud config set project'
alias cat='bat'
alias request='curl -s --header "Content-Type: application/json" --request POST --data'
alias rm="trash --trash-dir ~/.trash"
alias pbcopy="xclip -sel clip"
# alias kubectl="minikube kubectl --"

# Dev
alias lg="lazygit"
alias lzd="lazydocker"
alias nh="nvim ."
alias tmux-workspace="~/.config/tmux/utils/create_workspace.sh"
alias tw="tmux-workspace"
alias tks="tmux kill-session"
alias tclear="clear && tmux clear-history"
alias nvim-lsp-logs="nvim ~/.local/state/nvim/lsp.log"

# Git.
alias git-su="git submodule update --init --recursive --remote"
alias git-stats="git log --stat --pretty=tformat: --numstat | awk '!/\.lock\$/ {add+=\$1; subs+=\$2} END {print \"Total additions:\", add, \"\nTotal deletions:\", subs}'"
alias git-l="git log --oneline --decorate --graph"
alias git-sm-reset="git submodule deinit -f . && git submodule init && git submodule update --recursive"

# Gotta go fast
alias c="clear"
alias d="docker"
alias dc="COMPOSE_BAKE=true docker compose"
alias start_docker="sudo systemctl start docker"
alias nh="nvim ."
alias k="kubectl"
alias kc="kubectl create"
alias kd="kubectl delete"

# wal -R
