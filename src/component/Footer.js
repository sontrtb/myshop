import {Col, Row} from 'antd';
import '../styles/footer.css'

function Footer() {

    return(
        <div className="footer-container">
            <Row className='container'>
                <Col span={8}>
                    <h1 style={{margin: 0, color:'rgb(34, 109, 230)'}}>Nhóm 7</h1>
                </Col>
                <Col span={8}>
                    <h3>Bài tập lớn</h3>
                    <h2>Công nghệ phần mềm</h2>
                </Col>
                <Col span={8}>
                    <h2>Thành viên</h2>
                    <p>Phạm Hồng Sơn B19DCVT310</p>
                    <p>Nguyễn Hữu Thành</p>
                    <p>Nguyễn Đăng Khoa</p>
                </Col>
            </Row>
        </div>
    )
}

export default Footer;