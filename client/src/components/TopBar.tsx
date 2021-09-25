import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { IconButton } from '@material-ui/core';
import { Divider, Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import GitHubIcon from '@material-ui/icons/GitHub';
import Create from '@material-ui/icons/Create';


const TopBar = () => {

    return (
        <Box component="div">
            <AppBar position="static" color="primary">
                <Box display="flex" p={1}>
                    <Box flexGrow={1}>
                        <Typography variant="h5">ttya16's Tech Garage</Typography>
                    </Box>
                    <Box display="inline">
                        <IconButton aria-label="https://github.com/ttya16" onClick={() => window.open('https://github.com/ttya16')}>
                            <GitHubIcon />
                        </IconButton>
                        <IconButton aria-label="https://zenn.dev/ttya16" onClick={() => window.open('https://zenn.dev/ttya16')}>
                            <Create />
                        </IconButton>
                    </Box>
                </Box>
            </AppBar>
        </Box>
    )
}

export default TopBar;