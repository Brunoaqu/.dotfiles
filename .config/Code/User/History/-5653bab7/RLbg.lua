return { -- General UI/UX
{
    'glepnir/dashboard-nvim',
    dependencies = {'nvim-tree/nvim-web-devicons'},
    priority = 999,
    lazy = false,
    config = function()
        require 'alex.ui.dashboard'
    end
}, {
    'nvim-lualine/lualine.nvim',
    dependencies = {'nvim-tree/nvim-web-devicons'},
    event = {'User NvimStartupDone'},
    config = function()
        require 'alex.ui.lualine'
    end
}, {
    -- Required by other packages
    'nvim-tree/nvim-web-devicons',
    config = function()
        require 'alex.ui.nvim-web-devicons'
    end,
    lazy = true
}, {
    'NvChad/nvim-colorizer.lua',
    event = {'User NvimStartupDone'},
    config = function()
        require 'alex.ui.colorizer'
    end
}, {
    'nvim-tree/nvim-tree.lua',
    version = '*',
    dependencies = {'nvim-tree/nvim-web-devicons'},
    config = function()
        require 'alex.ui.tree'
    end
}, -- Themes
{
    'AlexvZyl/nordic.nvim',
    branch = 'dev',
    priority = 1000,
    config = function()
        require 'alex.themes.nordic'
    end,
    lazy = true
}}
