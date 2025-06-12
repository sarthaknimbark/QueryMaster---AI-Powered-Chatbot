import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();
  return  (
    <AppBar sx={{
        bgcolor: "transparent",
        position: "static",
        boxShadow: "none"
    }}>
      <Toolbar sx={{
        display: "flex",
        flexDirection: "row"
      }}>
        <Logo/>
        <div>
          {auth?.isLoggedIn ? ( <>

          <NavigationLink 
            to={'/chat'} 
            bg={'#00fffc'} 
            text={'Go to Chat'} 
            textColor={'Black'}/>

          <NavigationLink 
          to={'/'} 
          bg={'#51538f'} 
          text={'Logout'} 
          textColor={'white'}
          onClick={auth.logout}/>

          </> ) : <>
          
          <NavigationLink 
            to={'/login'} 
            bg={'#00fffc'} 
            text={'Login'} 
            textColor={'Black'}/>

          <NavigationLink 
          to={'/signup'} 
          bg={'#51538f'} 
          text={'Signup'} 
          textColor={'white'}/>

          </>
          }
        </div>
      </Toolbar>
    </AppBar>
  
  );
};

export default Header
