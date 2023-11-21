--require("Brunoaqu.remap")
-- vim.g.netrw_browse_split = 0
-- vim.g.netrw_banner = 0
-- vim.g.netrw_winsize = 25
-- vim.wo.number = true

-- This makes neovim load faster
vim.loader.enable()

-- Setup environment
local U = require 'Brunoaqu.utils'
local env_file = os.getenv 'HOME' .. '/.private/nvim_env.lua'
if U.file_exists(env_file) then vim.cmd('luafile ' .. env_file) end

-- Order is important
-- require('Brunoaqu.options')
require('Brunoaqu.lazyload')
require('Brunoaqu.ui')
-- require('Brunoaqu.keymaps').init()
