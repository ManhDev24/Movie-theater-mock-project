import { Button, Divider, Card, Col, Row, Cascader, InputNumber, Select, Space } from 'antd';
const Ticket = () =>{

    return(
        <div className='Card-layout'>
        <div className='Card-title-choose'>
          <h1>Chọn loại vé</h1>
        </div>

        <div className='Card'>
          <Row gutter={16}>
            <Col span={8}>
              <Card className="custom-card" title="Vé HSSV/người cao tuổi" variant="borderless">
                <p>Ghế đơn</p>
                <p>70,000 VNĐ</p>
                <InputNumber defaultValue={0} />
              </Card>
            </Col>
            <Col span={8}>
              <Card className="custom-card" title="Vé người lớn" variant="borderless">
                <p>Ghế đơn</p>
                <p>45,000 VNĐ</p>
                <InputNumber defaultValue={0} />
              </Card>
            </Col>
            <Col span={8}>
              <Card className="custom-card" title="Vé người lớn" variant="borderless">
                <p>Ghế đôi</p>
                <p>145,000 VNĐ</p>
                <InputNumber defaultValue={0} />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
}
export default Ticket;