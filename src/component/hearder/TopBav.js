import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import '../../styles/topbar.css'

function TopNav(){

    return(
        <div className="topbav-container">
            <div className='container'>
                <Row justify="space-between">
                    <Col style={{display: "flex"}}>
                        <EnvironmentOutlined className='topbar-icon' style={{ fontSize: '16px', color: '#fff' }}/>
                        <div className='topbar-text'>Địa chỉ...</div>
                        <MailOutlined className='topbar-icon' style={{ fontSize: '16px', color: '#fff' }}/>
                        <div className='topbar-text'>abc123@gmail.com</div>
                        <PhoneOutlined className='topbar-icon' style={{ fontSize: '16px', color: '#fff' }}/>
                        <div className='topbar-text'>0312345678</div>
                    </Col>
                    <Col style={{display: "flex"}}>
                        {/* acsbjshcj */}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TopNav;