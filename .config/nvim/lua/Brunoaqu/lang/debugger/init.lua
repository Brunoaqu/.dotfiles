require 'Brunoaqu.lang.debugger.dap'
require 'Brunoaqu.lang.debugger.ui'

-- AFTER dap was loaded.
local sign = vim.fn.sign_define
sign('DapBreakpoint', {
    text = '●',
    texthl = 'DapBreakpoint',
    linehl = '',
    numhl = ''
})
sign('DapBreakpointCondition', {
    text = '●',
    texthl = 'DapBreakpointCondition',
    linehl = '',
    numhl = ''
})
sign('DapLogPoint', {
    text = '◆',
    texthl = 'DapLogPoint',
    linehl = '',
    numhl = ''
})
