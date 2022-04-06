import React, { Component } from "react";
import { Card,Form,Button,Input,message, Modal} from "antd";


interface IState {
    formData: FormData
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

class AddSchema extends Component<IProps, IState> {
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
    cancel() {
        this.props.callback();
    }

    // 页面初始化时调用的函数
    componentDidMount() {
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
	onEdgeBaseValueChange = (e: any, index: number, type: string) => {
        let value = e.target.value
        const { edge_schema } = this.state.formData
        console.log(type)
        if(type === 'schema_name') {            
            edge_schema[index].schema_name = value
        } else if(type === 'src') {
            edge_schema[index].src = value
        }
        else if(type === 'dst') {
            edge_schema[index].dst = value
        }
        this.setState((state) => ({
            formData: {
                ...state.formData,
                edge_schema: [...edge_schema]
            }
        }))
    }

    onOneEdgeMiddleValueChange = (e: any, perIndex: number, index: number) => {
        let value = e.target.value
        const { edge_schema } = this.state.formData
        const { middles } = edge_schema[perIndex]
        middles[index] = value
        edge_schema[perIndex].middles = middles
        this.setState((state) => ({
            formData: {
                ...state.formData,
                edge_schema: [...edge_schema]
            }
        }))
    }

    onOneAttrValueChange = (e: any, schemaType: string, perIndex: number, index: number, type: string) => {
        let value = e.target.value
        const { edge_schema, vertex_schema } = this.state.formData
        const { attrs } = (schemaType == 'edge') ? edge_schema[perIndex] : vertex_schema[perIndex]
        if(type = 'name') {
            attrs[index].name = value
        } else {
            attrs[index].type = value
        }
        if(schemaType == 'edge') {    
            edge_schema[perIndex].attrs = attrs
        } else {    
            vertex_schema[perIndex].attrs = attrs
        }
        this.setState((state) => ({
            formData: {
                ...state.formData,
                edge_schema: [...edge_schema],
                vertex_schema: [...vertex_schema]
            }
        }))
    }

    onVertexBaseValueChange = (e: any, index: number, type: string) => {
        let value = e.target.value
        const { vertex_schema } = this.state.formData
        console.log(type)
        if(type === 'schema_name') {            
            vertex_schema[index].schema_name = value
        } else if(type === 'vertex_name') {
            vertex_schema[index].vertex_name = value
        }
        this.setState((state) => ({
            formData: {
                ...state.formData,
                vertex_schema: [...vertex_schema]
            }
        }))
    }

    addButtonClick = (index: number, type: string) => {
        if(type === 'edge') {
            this.setState((state) => ({
                formData: {
                    ...state.formData,
                    edge_schema: [
                        ...state.formData.edge_schema, 
                        {
                            schema_name: '',
                            src: '',
                            dst: '',
                            middles: [],
                            attrs: [
                                {
                                    name: '',
                                    type: '',
                                },
                            ],
                        }
                    ]
                }
            }))
        } else {
            this.setState((state) => ({
                formData: {
                    ...state.formData,
                    vertex_schema: [
                        ...state.formData.vertex_schema, 
                        {
                            schema_name: '',
                            vertex_name: '',
                            attrs: [
                                {
                                    name: '',
                                    type: '',
                                },
                            ],
                        }
                    ]
                }
            }))
        }   
    }

    // removeButtonClick = (item: , index, type) => {
    //     if(!item.id) {
    //         this.updateList(index, type)
    //     } else {
    //         // 正常情况需要向后端发送请求删除的时候打开，不需要的时候只用if里面的就行了
    //         // http(xxxxx, item.id).then(res => {
    //         message.success('This is a success message');
    //         this.updateList(index, type)
    //         // })
    //     }
    // }

    // updateList(index, type) {
    //     if(type === 'edge') {
    //         const { edge_schema } = this.state.formData
    //         edge_schema.splice(index, 1)
    //         this.setState((state) => ({
    //             formData: {
    //                 ...state.formData,
    //                 edge_schema: [...edge_schema]
    //             }
    //         }))
    //     } else {
    //         const { vertex_schema } = this.state.formData
    //         vertex_schema.splice(index, 1)
    //             this.setState((state) => ({
    //             formData: {
    //                 ...state.formData,
    //                 vertex_schema: [...vertex_schema]
    //             }
    //         }))
    //     }
    // }
    // 提交数据
    submitButtonClick() {

    }


    render(): React.ReactNode {
        return(
            <Modal
                title="添加"
                visible={this.props.visible}
                onCancel={this.cancel}
                footer={null}
            >
				{/* <Form
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 19 }}
					name="form-demo"
					autoComplete="off"
					style={{ width: 300, background: '#fff', padding: 10, margin: 10 }}
				>
					<Form.Item label='图名:' name={'graph_name'} rules={}>
						{ getFieldDecorator('', {
							rules: [{
								type: 'email',
								validator: (rule, value) => {
									if(value === '' || value === undefined) {
										return Promise.reject('图名不能为空！')
									}
									return Promise.resolve()
								}
							}],
						})(<)}   
					</Form.Item>	
				</Form> */}
                {/* <div className='c-form-demo' style={{
                    width: '1000px', minHeight: 200,borderWidth: '1px', borderStyle: 'solid',
                    borderColor: '#ececec'
                }}>
                <div style={{ width: '100%', borderColor: '#fff' }}>
                    
                </div>
                <div style={{ 
                    height: 200, overflowY: 'auto', width: 1000, boxSizing: 'border-box',display: 'flex', flexWrap: 'wrap',
                    marginLeft: 10
                }}>
                    <Card style={{ width: 480, minWidth: 400, height: 200, overflowY: 'auto', marginRight: 10 }}>
                        {
                            this.state.formData.edge_schema.map((item, index) => {
                                return (
                                    <div style={{ 'marginBottom': 10, display: 'flex'}} key={index + 'first'}>
                                        <label style={{ width: 50, textAlign: 'right',paddingTop: 8, fontWeight: 700 }}>名称：</label> 
                                        <Input
                                            style={{ width: 200, marginRight: 10 }}
                                            onChange={(e) => this.onEdgeBaseValueChange(e, index, 'schema_name')}
                                        />
                                    
                                        <Button
                                            type="primary" style={{ marginRight: 10 }}
                                            onClick={() => this.addButtonClick(index, 'edge')}
                                            disabled={ index !== this.state.formData.edge_schema.length - 1 }
                                        >添加</Button>
                                        {
                                            (index > 0 && (index === this.state.formData.vertex_schema.length - 1))
                                            && <Button
                                                type="primary"
                                                onClick={() => this.removeButtonClick(item, index, 'edge')}
                                            >删除</Button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </Card>
                    <Card style={{ width: 480, minWidth: 400, height: 200, overflowY: 'auto'}}>
                        {
                            this.state.formData.vertex_schema.map((item, index) => {
                                return(
                                    <div style={{ 'marginBottom': 10, display: 'flex'}}  key={index + 'last'}>
                                        <label
                                            style={{ width: 50, textAlign: 'right',paddingTop: 8, fontWeight: 700 }}
                                        >名称：</label> 
                                        <Input
                                            style={{ width: 200, marginRight: 10 }}
                                            onChange={(e) => this.onVertexBaseValueChange(e, index, 'schema_name')}
                                        />
                                        <Button
                                            type="primary"  style={{ marginRight: 10 }}
                                            onClick={ () => this.addButtonClick(index, 'vertex')}
                                            disabled={ index !== this.state.formData.vertex_schema.length - 1 }
                                        >添加</Button>
                                        {
                                            (index > 0 && index === this.state.formData.vertex_schema.length - 1)
                                            && <Button
                                                type="primary"
                                                onClick={() => this.removeButtonClick(item, index, 'vertex')}
                                            >删除</Button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </Card>   
                </div>
                    <div className="button-Submit">
                        <Button
                            type="primary"
                            onClick={ this.submitButtonClick }
                        >提交</Button>
                    </div>
                </div> */}
            </Modal>
        )
    }
}

export default AddSchema;