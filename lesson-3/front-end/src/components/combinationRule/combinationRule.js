const typeToOperate = function(type) {
    switch (type) {
        case 'BOOLEAN':
            return [
                { label: '是', value: 'TRUE' },
                { label: '否', value: 'FALSE' },
                { label: '空值', value: 'EMPTY' },
                { label: '非空', value: 'NOT_EMPTY' }
            ]
        case 'NUMBER':
            return [
                { label: '等于', value: 'EQ' },
                { label: '不等于', value: 'NE' },
                { label: '大于', value: 'GT' },
                { label: '大于等于', value: 'GE' },
                { label: '小于', value: 'LS' },
                { label: '小于等于', value: 'LE' },
                { label: '区间', value: 'BETWEEN' },
                { label: '空值', value: 'EMPTY' },
                { label: '非空', value: 'NOT_EMPTY' }
            ]
            // case 'TIME':
        case 'DATETIME':
            return [
                { label: '绝对时间区间', value: 'BETWEEN' },
                { label: '相对时间区间', value: 'RELATIVE' },
                { label: '快捷相对时间', value: 'SHORTCUT_RELATIVE' }
            ]
        case 'TIMEUNIT':
            return [
                { label: '天前', value: 'BEFORE_DAY' },
                { label: '当天', value: 'TODAY' },
                { label: '天后', value: 'AFTER_DAY' }
            ]
        case 'TEXT':
            return [
                { label: '等于', value: 'EQ' },
                { label: '不等于', value: 'NE' },
                { label: '包含', value: 'INC' },
                { label: '不包含', value: 'NINC' },
                { label: '空值', value: 'EMPTY' },
                { label: '非空', value: 'NOT_EMPTY' }
            ]
        case 'OPTIONS':
            return [
                { label: '等于', value: 'EQ' },
                { label: '不等于', value: 'NE' },
                { label: '在···内', value: 'IN' },
                { label: '在···外', value: 'NOT_IN' },
                { label: '空值', value: 'EMPTY' },
                { label: '非空', value: 'NOT_EMPTY' }
            ]
        default:
            break
    }
}

export { typeToOperate }
