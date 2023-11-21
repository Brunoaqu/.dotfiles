return { -- General UI/UX
{
    'glepnir/dashboard-nvim',
    dependencies = {'nvim-tree/nvim-web-devicons'},
    priority = 999,
    lazy = false,
    config = function()
        require 'Brunoaqu.ui.dashboard'
    end
}, {
    -- Required by other packages
    'nvim-tree/nvim-web-devicons',
    config = function()
        require 'Brunoaqu.ui.nvim-web-devicons'
    end,
    lazy = true
}, {
    'NvChad/nvim-colorizer.lua',
    event = {'User NvimStartupDone'},
    config = function()
        require 'Brunoaqu.ui.colorizer'
    end
}, {
    'nvim-telescope/telescope.nvim',
    dependencies = {'nvim-lua/plenary.nvim', 'nvim-lua/popup.nvim'},
    cmd = 'Telescope',
    config = function()
        require 'Brunoaqu.ui.telescope'
    end
}, {
    'nvim-lualine/lualine.nvim',
    dependencies = {'nvim-tree/nvim-web-devicons', 'nvim-lua/plenary.nvim'},
    event = {'User NvimStartupDone'},
    config = function()
        require 'Brunoaqu.ui.lualine'
    end
}, {
    'willothy/nvim-cokeline',
    dependencies = {'nvim-lua/plenary.nvim', 'nvim-tree/nvim-web-devicons'},
    config = function()
        require 'Brunoaqu.ui.cokeline'
    end,
    event = {'BufWinEnter'}
}, {
    'folke/noice.nvim',
    dependencies = {'MunifTanjim/nui.nvim', 'rcarriga/nvim-notify'},
    event = {'User NvimStartupDone'},
    config = function()
        require 'Brunoaqu.ui.noice'
    end
}, {
    'lukas-reineke/indent-blankline.nvim',
    event = {'VeryLazy'},
    config = function()
        require 'Brunoaqu.ui.indent-blankline'
    end
}, {
    'RRethy/vim-illuminate',
    event = {'User NvimStartupDone'},
    config = function()
        require 'Brunoaqu.ui/illuminate'
    end
}, {
    'lewis6991/gitsigns.nvim',
    event = {'User NvimStartupDone'},
    config = function()
        require 'Brunoaqu.ui.gitsigns'
    end
}, {
    'sindrets/diffview.nvim',
    cmd = {'DiffviewClose', 'DiffviewOpen'},
    config = function()
        require 'Brunoaqu.ui.diffview'
    end
}, {
    'folke/which-key.nvim',
    event = {'User NvimStartupDone'},
    config = function()
        require 'Brunoaqu.ui.which-key'
    end
}, {
    'sudormrfbin/cheatsheet.nvim',
    cmd = {'Cheatsheet'}
}, {
    'nvim-tree/nvim-tree.lua',
    version = '*',
    dependencies = {'nvim-tree/nvim-web-devicons'},
    config = function()
        require 'Brunoaqu.ui.tree'
    end
}, -- Themes
{
    'BrunoaquvZyl/nordic.nvim',
    priority = 1000,
    config = function()
        require 'Brunoaqu.themes.nordic'
    end
}}
