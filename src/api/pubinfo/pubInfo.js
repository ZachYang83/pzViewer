export function getCiv(props) {
    var civ = [
        {
            prop: "名称",
            value: props['name']
        },
        {
            prop: "地址",
            value: props['address']
        },
        {
            prop: "经度",
            value: props['lon']
        },
        {
            prop: "纬度",
            value: props['lat']
        },
        {
            prop: "设施大类",
            value: props['ssdl']
        },
        {
            prop: "设施小类",
            value: props['ssxl']
        },
        {
            prop: "建筑面积",
            value: props['area']
        },
        {
            prop: "设施级别",
            value: props['ssjb']
        },
        {
            prop: "设施产权",
            value: props['sscq']
        },
        {
            prop: "经营性质",
            value: props['nature']
        },
        {
            prop: "年供养人数",
            value: props['providor']
        },
        {
            prop: "年服务人数",
            value: props['server']
        },
    ];
    return civ;
}


export function getMed(props) {
    var med =
        [
            {
                prop: "名称",
                value: props['name']
            },
            {
                prop: "地址",
                value: props['address']
            },
            {
                prop: "经度",
                value: props['lon']
            },
            {
                prop: "纬度",
                value: props['lat']
            },
            {
                prop: "设施大类",
                value: props['ssdl']
            },
            {
                prop: "设施小类",
                value: props['ssxl']
            },
            {
                prop: "建筑面积",
                value: props['area']
            },
            {
                prop: "设施级别",
                value: props['ssjb']
            },
            {
                prop: "设施产权",
                value: props['sscq']
            },
            {
                prop: "床位数",
                value: props['bed']
            },
            {
                prop: "执业医生数",
                value: props['doctor']
            },
            {
                prop: "年诊疗人数",
                value: props['patient']
            },
        ];
    return med;
}

export function getEdu(props) {
    var edu =
        [
            {
                prop: "名称",
                value: props['name']
            },
            {
                prop: "地址",
                value: props['address']
            },
            {
                prop: "经度",
                value: props['lon']
            },
            {
                prop: "纬度",
                value: props['lat']
            },
            {
                prop: "设施大类",
                value: props['ssdl']
            },
            {
                prop: "设施小类",
                value: props['ssxl']
            },
            {
                prop: "建筑面积",
                value: props['area']
            },
            {
                prop: "设施级别",
                value: props['ssjb']
            },
            {
                prop: "设施产权",
                value: props['sscq']
            },
            {
                prop: "学生招生数",
                value: props['zsStu']
            },
            {
                prop: "学生实际数",
                value: props['sjStu']
            },
            {
                prop: "教职工人数",
                value: props['teacher']
            },
        ];
    return edu;
}

export function getPal(props) {
    var pal =
        [
            {
                prop: "名称",
                value: props['name']
            },
            {
                prop: "地址",
                value: props['address']
            },
            {
                prop: "经度",
                value: props['lon']
            },
            {
                prop: "纬度",
                value: props['lat']
            },
            {
                prop: "设施大类",
                value: props['ssdl']
            },
            {
                prop: "设施小类",
                value: props['ssxl']
            },
            {
                prop: "建筑面积",
                value: props['area']
            },
            {
                prop: "设施产权",
                value: props['sscq']
            },
            {
                prop: "年办证量",
                value: props['card']
            },
            {
                prop: "年接待中国公民数",
                value: props['citizen']
            },
            {
                prop: "年接待外管人数",
                value: props['manager']
            },
            {
                prop: "年服务人群规模",
                value: props['allPeople']
            },
            {
                prop: "入额检察官数",
                value: props['judge']
            },
            {
                prop: "全院人数",
                value: props['servers']
            },
            {
                prop: "年接待外管人数",
                value: props['prosecutor']
            },
            {
                prop: "本级区域人群规模",
                value: props['crowdSize']
            },
            {
                prop: "年办案数",
                value: props['cases']
            },
            {
                prop: "年受理总数量",
                value: props['accept']
            },
        ];
    return pal;
}

export function getCul(props) {
    var cul =
        [
            {
                prop: "名称",
                value: props['name']
            },
            {
                prop: "地址",
                value: props['address']
            },
            {
                prop: "经度",
                value: props['lon']
            },
            {
                prop: "纬度",
                value: props['lat']
            },
            {
                prop: "设施小类",
                value: props['ssxl']
            },
            {
                prop: "建筑面积",
                value: props['area']
            },
            {
                prop: "设施产权",
                value: props['sscq']
            },
            {
                prop: "规模",
                value: props['scale']
            },
        ];
    return cul;
}

export function getSpo(props) {
    var spo =
        [
            {
                prop: "名称",
                value: props['name']
            },
            {
                prop: "地址",
                value: props['address']
            },
            {
                prop: "经度",
                value: props['lon']
            },
            {
                prop: "纬度",
                value: props['lat']
            },
            {
                prop: "设施小类",
                value: props['ssxl']
            },
            {
                prop: "建筑面积",
                value: props['area']
            },
            {
                prop: "设施产权",
                value: props['sscq']
            },
            {
                prop: "服务规模",
                value: props['fitness']
            },
        ];
    return spo;
}

export function getHousePrice(props) {
    var houseprice =
        [
            {
                prop: "名称",
                value: props['name']
            },
            {
                prop: "房价",
                value: props['price']
            },
            {
                prop: "建成年份",
                value: props['time']
            },
            {
                prop: "占地面积",
                value: props['zdarea']
            },
            {
                prop: "建筑面积",
                value: props['jzarea']
            },
            {
                prop: "栋数",
                value: props['ldzs']
            },
            {
                prop: "住户数",
                value: props['lwzs']
            },
            {
                prop: "产权",
                value: props['chanquan']
            },
            {
                prop: "容积率",
                value: props['rjl']
            },
            {
                prop: "绿化率",
                value: props['lhl']
            },
            {
                prop: "建筑结构",
                value: props['jzjg']
            },
            {
                prop: "建筑类型",
                value: props['jzlx']
            },
        ];
    return houseprice;
}

export function getSecondHouse(props) {
    var secondhouse =
        [
            {
                prop: "名称",
                value: props['name']
            },
            {
                prop: "房价",
                value: props['price']
            },
            {
                prop: "建成年份",
                value: props['jcnd']
            },
            {
                prop: "建筑面积",
                value: props['area']
            },
            {
                prop: "总套数",
                value: props['sum']
            },
            {
                prop: "住户数",
                value: props['lwzs']
            },
            {
                prop: "产权",
                value: props['cq']
            },
            {
                prop: "房屋用途",
                value: props['fwyt']
            },
            {
                prop: "楼层",
                value: props['lc']
            },
            {
                prop: "建筑结构",
                value: props['jzjg']
            },
            {
                prop: "建筑类型",
                value: props['jzlx']
            },
        ];
    return secondhouse;
}

export function getZufang(props) {
    var zufang =
        [
            {
                prop: "小区",
                value: props['小区']
            },
            {
                prop: "区域",
                value: props['区域2']
            },
            {
                prop: "租金",
                value: props['租金元_']
            },
            {
                prop: "面积",
                value: props['面积']
            },
            {
                prop: "户型",
                value: props['户型']
            },
            {
                prop: "朝向",
                value: props['朝向']
            },
            {
                prop: "楼层",
                value: props['楼层']
            },
            {
                prop: "电梯",
                value: props['电梯']
            },
            {
                prop: "车位",
                value: props['车位']
            },
            {
                prop: "用电",
                value: props['用电']
            },
            {
                prop: "用水",
                value: props['用水']
            },
        ];
    return zufang;
}