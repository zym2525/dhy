import {getLocalTime} from '../util/common'
export const columns = [
  { title: '编号',width: 100, dataIndex: 'applicationCode', key: 'applicationCode', fixed: 'left' },
  { title: '培训项目名称',width: 100, dataIndex: 'projectName', key: 'projectName' ,fixed: 'left'},
  { title: '分院', dataIndex: 'branch', key: 'branch' },
  { title: '分院结余', dataIndex: 'branchBalance', key: 'branchBalance' },
  { title: '成本支出', dataIndex: 'costPay', key: 'costPay' },
  { title: '总收入一', dataIndex: 'incomeOne', key: 'incomeOne' },
  { title: '总收入二', dataIndex: 'incomeTwo', key: 'incomeTwo' },
  {
    title: '到款时间',
    dataIndex: 'moneyTime',
    key: 'moneyTime' ,
    render(text){
      if(text=='未到款'){
        return text;
      }else{
        return getLocalTime(text);
      }
    }
  },
  { title: '合作单位分成', dataIndex: 'pratnerIncome', key: 'pratnerIncome' },
  { title: '上缴学校金额', dataIndex: 'schoolIncome', key: 'schoolIncome' },
  //{
  //  title: '操作',
  //  key: 'operation',
  //  fixed: 'right',
  //  width: 60,
  //  render() {
  //    return <a href="#">操作</a>;
  //  }
  //},
];

export const financeConfig={
  columns,
  scroll:{ x: '150%' },
  pagination:false
};
