return {
    {
        'nvim-lualine/lualine.nvim',
        dependencies = { 'nvim-tree/nvim-web-devicons' },
        event = { 'User NvimStartupDone' },
        config = function() require 'alex.ui.lualine' end,
    }
}
