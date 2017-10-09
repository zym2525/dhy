import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Form, Input, Upload,Button,Icon } from 'antd';
import {api} from '../../util/common';
import {getCookie} from  '../../util/cookie';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};
const username=getCookie('loginName');
class Graduation extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="form">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <FormItem
              {...formItemLayout}
              label={(<span>总收入一</span>)}
              style={{width:'60%',display:'inline-block'}}
              hasFeedback
            >
              {getFieldDecorator('incomeOne',{
                initialValue:this.props.values&&this.props.values.incomeOne,
                rules: [{ required: true, message: '请输入总收入!', whitespace: true }]
              })(
                <Input name="incomeOne" type="number" disabled={this.props.isPreview}/>
              )}
            </FormItem>
            <span style={{lineHeight:'32px'}}>元</span>
          </div>
          <div>
            <FormItem
              {...formItemLayout}
              label={(<span>合作单位分成</span>)}
              style={{width:'60%',display:'inline-block'}}
              hasFeedback
            >
              {getFieldDecorator('pratnerIncome',{
                initialValue:this.props.values&&this.props.values.pratnerIncome,
                rules: [{ required: true, message: '请输入合作单位分成!', whitespace: true }]
              })(
                <Input name="pratnerIncome" type="number" disabled={this.props.isPreview}/>
              )}
            </FormItem>
            <span style={{lineHeight:'32px'}}>元</span>
          </div>
          <div>
            <FormItem
              {...formItemLayout}
              label={(<span>上交学校</span>)}
              style={{width:'60%',display:'inline-block'}}
              hasFeedback
            >
              {getFieldDecorator('schoolIncome',{
                initialValue:this.props.values&&this.props.values.schoolIncome,
                rules: [{ required: true, message: '请输入上交学校(元)!', whitespace: true }]
              })(
                <Input name="schoolIncome" type="number" disabled={this.props.isPreview}/>
              )}
            </FormItem>
            <span style={{lineHeight:'32px'}}>元</span>
          </div>
          <div>
            <FormItem
              {...formItemLayout}
              label={(<span>成本支出</span>)}
              style={{width:'60%',display:'inline-block'}}
              hasFeedback
            >
              {getFieldDecorator('costPay',{
                initialValue:this.props.values&&this.props.values.costPay,
                rules: [{ required: true, message: '请输入成本支出!', whitespace: true }]
              })(
                <Input name="costPay" type="number" disabled={this.props.isPreview}/>
              )}
            </FormItem>
            <span style={{lineHeight:'32px'}}>元</span>
          </div>

          {
            !this.props.isPreview&&
            <div>
              <FormItem
                {...formItemLayout}
                label="上传结业表"
              >
                {getFieldDecorator('uploadForms', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload name='file' action={api+"/dhy/background/fileOperate/upload"} listType="text" data={this.getGraduationFrom.bind(this)}>
                    <Button>
                      <Icon type="upload" />选择文件
                    </Button>
                  </Upload>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="上传照片"
              >
                {getFieldDecorator('uploadImages', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload name='file' action={api+"/dhy/background/fileOperate/upload"} listType="text" data={this.getGraduationImage.bind(this)}>
                    <Button>
                      <Icon type="upload" />选择文件
                    </Button>
                  </Upload>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
              </FormItem>
            </div>
          }
        </Form>
      </div>
    );
  }
  getGraduationFrom(){
    return{
      fileType:8,
      loginName:username
    };
  }
  getGraduationImage(){
    return{
      fileType:7,
      loginName:username
    };
  }
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      this.props.callBackSubmit&&this.props.callBackSubmit(values);
    })
  }
}
Graduation = Form.create({})(Graduation);
export default Graduation;
