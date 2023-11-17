vim.opt.termguicolors = true

require("bufferline").setup{
	options = {
		mode = 'tabs',
		indicator = {
			style = 'icon',
			icon = '',
			buffer_close_icon = ' ',
			modified_icon = '●',
			close_icon = ' ',
			left_trunc_marker = '<-',
			right_trunc_marker = '->',
		},
		offsets = {
			{
				filetype = "NvimTree",
				text = "File Explorer",
				separator = true,
				text_align = "center",
			}
		},
		color_icons = true,
		diagnostics = "nvim_lsp",
		separator_style = 'thin',
		always_show_bufferline = true
	}
}
