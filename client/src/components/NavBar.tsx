import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, FunctionOutlined, FileTextOutlined } from '@ant-design/icons';
import { GithubOutlined, GithubFilled } from '@ant-design/icons';
import icon from "../images/icon.png";

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={5} className="logo">
                    <Link to="/">ttya16's Tech Gar(b)age</Link>
                </Typography.Title>

                <Button 
                    type='text' 
                    icon={<GithubFilled style={{ color: "#FFFFFF"}}/>} 
                    onClick={() => window.open('https://github.com/ttya16')} 
                />
            </div>


            <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FunctionOutlined />}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Navbar;