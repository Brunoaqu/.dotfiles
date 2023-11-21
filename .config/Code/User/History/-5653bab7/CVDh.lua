return {
    {
        'nvim-lualine/lualine.nvim',
        dependencies = { 'nvim-tree/nvim-web-devicons' },
        event = { 'User NvimStartupDone' },
        config = function() require 'alex.ui.lualine' end,
    },
    {
        -- Required by other packages
        'nvim-tree/nvim-web-devicons',
        config = function() require 'alex.ui.nvim-web-devicons' end,
        lazy = true,
    },
}
