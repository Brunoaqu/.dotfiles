local icons = require 'nvim-web-devicons'
local get_icon = icons.get_icon
local go_icon = get_icon('', '.go')

icons.setup {
    strict = true,
    override_by_filename = {
        ['go.mod'] = { icon = '' },
        ['go.sum'] = { icon = '' },
    },
}
