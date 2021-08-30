import { Box, Grid } from '@material-ui/core';
import UserForm from './component/UserForm';
import UserCardList from './component/UserCardList';

function App() {
  return (
    <>
        <Grid container>
          <Grid item md={6} xs={12}>
              <UserForm />
          </Grid>
          <Grid item md={6} xs={12} style={{backgroundColor:'#52b788'}}>
              <Box p={3}>
                <UserCardList />
              </Box>
          </Grid>
        </Grid>
    </>
  );
}

export default App;
