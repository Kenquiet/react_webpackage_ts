import React, { Component, useRef } from "react";
import { Card,Form,Button,Input, message, Modal, Tag} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

interface IState {
    formData: FormData,
}
interface FormData {
    graph_name: string,
    edge_schema: EdgeSchemaElement[],
    vertex_schema: VertexSchemaElement[]
}

interface EdgeSchemaElement {
    schema_name: string,
    src: string,
    dst: string,
    middles: string[],
    inputMiddles: string,
    attrs: Attr[]
}

interface VertexSchemaElement {
    schema_name: string,
    vertex_name: string,
    attrs: Attr[]
}
interface Attr {
    name: string | number,
    type: string | number
}

interface IProps {
    visible: boolean,
    callback: () => void
}

export default class AddSchema extends Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            formData: {
                graph_name: '',    
                edge_schema: [
                    {
                        schema_name: '',
                        src: '',
                        dst: '',
                        middles: [],
                        inputMiddles: '', // 这个是为了管理输入框
                        attrs: [
                            {
                                name: '',
                                type: '',
                            },
                        ],
                    },
                ],
                vertex_schema: [
                    {
                        schema_name: '',
                        vertex_name: '',
                        attrs: [
                            {
                                name: '',
                                type: '',
                            },
                        ],
                    },
                ],
            },
        }
    }
    // 取消关闭按钮
    cancel = () => {
        // 这里是要做对state进行再次初始化
        this.props.callback();
    }
    // 页面初始化时调用的函数
    componentDidMount = () => {
        console.log('页面初始化请求')
    }

    // 修改图名称
    onGraphNameChange = (e: any) => {
        let value = e.target.value
        this.setState((state) => ({
            formData: {
                ...state.formData,
                graph_name: value
            }
        }))
    }
    submitButtonClick = () =>{
        console.log(this.state.formData)
    }
    // 修改vertex
    onVertexSchemaName = (e: any, index: number) => {
        let value = e.target.value
        const { vertex_schema } = this.state.formData
        vertex_schema[index].schema_name = value
        this.setState((state) => ({
            formData: {
                ...state.formData,
                vertex_schema: [...vertex_schema]
            }
        }))
    }
    onVertexName = (e: any, index: number) => {
        let value = e.target.value
        const { vertex_schema } = this.state.formData
        vertex_schema[index].vertex_name = value
        this.setState((state) => ({
            formData: {
                ...state.formData,
                vertex_schema: [...vertex_schema]
            }
        }))
    }
    onEdgeSchemaName = (e: any, index: number) => {
        let value = e.target.value
        const { edge_schema } = this.state.formData
        edge_schema[index].schema_name = value
        this.setState((state) => ({
            formData: {
                ...state.formData,
                edge_schema: [...edge_schema]
            }
        }))
    }
    onEdgeSrc = (e: any, index: number) => {
        let value = e.target.value
        const { edge_schema } = this.state.formData
        edge_schema[index].src = value
        this.setState((state) => ({
            formData: {
                ...state.formData,
                edge_schema: [...edge_schema]
            }
        }))
    }
    onEdgeDst = (e: any, index: number) => {
        let value = e.target.value
        const { edge_schema } = this.state.formData
        edge_schema[index].dst = value
        this.setState((state) => ({
            formData: {
                ...state.formData,
                edge_schema: [...edge_schema]
            }
        }))
    }
    onNameValueChange = (context: any) => {
        const { e, type, index , pIndex } = context
        const value = e.target.value
        const schema =  type === 'edge' ? this.state.formData.edge_schema : this.state.formData.vertex_schema
        const { attrs } = schema[pIndex]
        attrs[index].name = value
        this.setState((state) => ({
            formData: {
                ...state,
                ...this.state.formData
            }
        }))
    }

    onTypeValueChange = (context: any) => {
        const { e, type, index , pIndex } = context
        const value = e.target.value
        const schema =  type === 'edge' ? this.state.formData.edge_schema : this.state.formData.vertex_schema
        const { attrs } = schema[pIndex]
        attrs[index].type = value
        this.setState((state) => ({
            formData: {
                ...state,
                ...this.state.formData
            }
        }))
    }

    onAddAttr = (context: any) => {
        const { type, index, pIndex } = context
        const schema =  type === 'edge' ? this.state.formData.edge_schema : this.state.formData.vertex_schema
        const { attrs } = schema[pIndex]
        if(attrs[index].name === '' || attrs[index].type === '') {
            return message.warning('name 或 type不能为空,请填写完整后再添加!')
        }
        attrs.push({name: '', type: ''})
        this.setState((state) => ({
            formData: {
                ...state,
                ...this.state.formData
            }
        }))
    }
    onRemoveAttr = (context: any) => {
        const { type, index, pIndex } = context
        const schema =  type === 'edge' ? this.state.formData.edge_schema : this.state.formData.vertex_schema
        const { attrs } = schema[pIndex]
        attrs.splice(index, 1)
        this.setState((state) => ({
            formData: {
                ...state,
                ...this.state.formData
            }
        }))
    }
    onAddMiddles = (e: any, index: number) => {
        const value = e.target.value
        const { edge_schema }  = this.state.formData
        const { middles } = edge_schema[index]
        // Array.from(document.querySelectorAll('.meddle')).forEach((input, forIndex: number) => {
        //     if(forIndex === index) {
        //         console.log(input.nodeValue)
        //     }
        // })
        if(!middles.includes(value)) {
            middles.push(value)
            edge_schema[index].inputMiddles = ''// 那这条就不生效了
            this.setState((state) => ({
                formData: {
                    ...state,
                    ...this.state.formData
                }
            }))
        }
    }
    onChangeMiddles = (e:any, index: number) => {
        const value = e.target.value
        const { edge_schema }  = this.state.formData
        edge_schema[index].inputMiddles = value
        this.setState((state) => ({
            formData: {
                ...state,
                ...this.state.formData
            }
        }))
    }
    onRemoveMiddle = (e: any, index: number, mIndex: number) => {
        const { middles } = this.state.formData.edge_schema[index]
        const value = middles[mIndex]
        confirm({
            title: `你确定要删除 + "${value}"吗?`,
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
              middles.splice(mIndex, 1)
              this.setState((state) => ({
                formData: {
                    ...state,
                    ...this.state.formData
                }
            }))
            },
            onCancel() {
              message.info('取消删除~')
            },
          });
    }
    renderMiddle = (item: EdgeSchemaElement, index: number) => {
        if(item.middles.length > 0) {
            return (
                <div style={{
                    padding: 10,
                    marginLeft: 115,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#eee',
                    marginTop: 5
                }}>
                    {
                        item.middles.map((middle:string, mIndex: number) => {
                            return (
                                <Tag key={ `${index}middle${mIndex}`  }
                                    closable
                                    color="blue"
                                    onClose={ (e) => this.onRemoveMiddle(e, index, mIndex) }>
                                    { middle }
                                </Tag>
                            )
                        })
                    }
                </div>
            )
        }
    }
    render(): React.ReactNode {
        const atterEle = (list: Attr[], pIndex: number, type: 'edge'| 'vertex') => {
            return list.map((item: Attr, index: number) => {
                return (
                    <Card key={index + 'atterEle' + type}>
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            layout="inline"
                            key={index + 'atterEle' + type}
                        >
                            <Form.Item
                                label='name: '
                                name={ 'name' }
                                rules={[{ required: true, message: 'Please input name!' }]}
                            >
                                <Input
                                    placeholder="请输入name..."
                                    style={{ width: 100, marginRight: 10 }}
                                    onChange={(e) => this.onNameValueChange({e, index, type, pIndex})}
                                />
                            </Form.Item>
                            <Form.Item
                                label='type: '
                                name={ 'type' }
                                rules={[{ required: true, message: 'Please input type!' }]}
                            >
                                <Input
                                    placeholder="请输入type..."
                                    style={{ width: 100, marginRight: 10 }}
                                    onChange={(e) => this.onTypeValueChange({e, index, type, pIndex})}
                                />
                            </Form.Item>
                            <Form.Item>
                                <div style={{ display: 'flex' }}>
                                    <Button
                                        type="primary" style={{ marginRight: 10 }}
                                        onClick={() => this.onAddAttr({index, type, pIndex})}
                                        disabled={ index !== list.length - 1 }
                                    >添加</Button>
                                    {
                                        (index > 0 && (index === list.length - 1))
                                        && <Button
                                            type="primary"
                                            danger
                                            onClick={() => this.onRemoveAttr({index, type, pIndex})}
                                        >删除</Button>
                                    }
                                </div>
                            </Form.Item>
                        </Form>
                    </Card>
                )
            })
        }
        const edgeSchemaEle = this.state.formData.edge_schema.map((item, index) => {
            return (
                <div style={{ 'marginBottom': 10, }} key={index + 'edge'}>
                    <Form
                        labelCol={{ span: 5 }}
					    wrapperCol={{ span: 19}}>
                        <Form.Item
                            label='schema_name:'
                            name={"schema_name"}
                            rules={[{ required: true, message: 'Please input schema_name!' }]}
                        >
                            <Input
                                placeholder="请输入schema_name..."
                                style={{ width: 200, marginRight: 10 }}
                                onChange={(e) => this.onEdgeSchemaName(e, index)}
                            />
                        </Form.Item>
                        <Form.Item
                            label='src:'
                            name={"src"}
                            rules={[{ required: true, message: 'Please input src!' }]}
                        >
                            <Input
                                placeholder="请输入src..."
                                style={{ width: 200, marginRight: 10 }}
                                onChange={(e) => this.onEdgeSrc(e, index)}
                            />
                        </Form.Item>
                        <Form.Item label='dst:' name={"dst"}>
                            <Input
                                placeholder="请输入dst..."
                                style={{ width: 200, marginRight: 10 }}
                                onChange={(e) => this.onEdgeDst(e, index)}
                            />
                        </Form.Item>              
                    </Form>
                    <div style={{ marginBottom: 10}}>
                        <div style={{ display: 'flex' }}>
                            <label style={{ width: 115, textAlign: 'right', marginTop: 3, marginRight: 3 }}>middles:</label>
                            <Input
                                className="meddle"
                                placeholder="请输入并按回车键添加..."
                                style={{ width: 200 }}
                                onPressEnter={ (e) => this.onAddMiddles(e, index) }
                                onChange={(e) => this.onChangeMiddles(e, index) }
                            />
                        </div>
                        { this.renderMiddle(item, index) }
                    </div>
                    <div>
                        { atterEle(item.attrs, index, 'edge') }      
                    </div>
                </div>
            )
        })

        const vertexSchemaEle = this.state.formData.vertex_schema.map((item, index) => {
            return (
                <div style={{ 'marginBottom': 10 }} key={index + 'vertex'}>
                    <Form
                        labelCol={{ span: 4 }}
					    wrapperCol={{ span: 20 }}>
                        <Form.Item label='schema_name:' name={"schema_name"}>
                            <Input
                                placeholder="请输入schema_name..."
                                style={{ width: 200, marginRight: 10 }}
                                onChange={(e) => this.onVertexSchemaName(e, index)}
                            />
                        </Form.Item>
                        <Form.Item label='vertex_name:' name={"vertex_name"}>
                            <Input
                                placeholder="请输入vertex_name..."
                                style={{ width: 200, marginRight: 10 }}
                                onChange={(e) => this.onVertexName(e, index)}
                            />
                        </Form.Item>           
                    </Form>
                    <div>
                        { atterEle(item.attrs, index, 'vertex') }      
                    </div>
                           
                </div>
            )
        })

       
        return(
            <Modal
                title="添加"
                visible={this.props.visible}
                onCancel={this.cancel}
                footer={null}
                width={ 1300 }
            >
				<Form
					labelCol={{ span: 2 }}
					wrapperCol={{ span: 22 }}
					name="form-demo"
					autoComplete="off"
					style={{ background: '#fff', padding: 10, margin: 10, width: '50%' }}
				>
					<Form.Item label='图名:' name={'graph_name'} rules={[{
                        type: 'string',
                        validator: (rule, value) => {
                            if(value === '' || value === undefined) {
                                return Promise.reject('图名不能为空！')
                            }
                            return Promise.resolve()
                        }
                    }]}>
                        <Input placeholder="请输入graph_name..." onChange={ this.onGraphNameChange }></Input>   
					</Form.Item>	
				</Form>
                <div style={{ height: 500, overflowY: 'auto', width: '100%', boxSizing: 'border-box', display: "flex", flexWrap: 'wrap' }}>
                    <Card style={{ width: '49%', minWidth: 400, height: 500, overflowY: 'auto', marginRight: 10 }}>
                        { edgeSchemaEle }
                    </Card>
                    <Card style={{ width: '49%', minWidth: 400, height: 500, overflowY: 'auto', marginRight: 10 }}>
                        { vertexSchemaEle }
                    </Card>
                </div>
                <div style={{ width: '100%', textAlign: 'center', marginTop: 15 }}>
                    <Button
                        type="primary"
                        onClick={ this.submitButtonClick }
                        style={{ marginRight: 15 }}
                    >提交</Button>
                    <Button
                        type="primary"
                        onClick={ this.cancel }
                    >关闭</Button>
                </div>
            </Modal>
        )
    }
}