import { Typography } from '@mui/material';
import MainSearchLayout from './MainSearchLayout';
import CustomTypography from '@/comonents/ui/CustomTypography';
import CustomTextField from '@/comonents/form/CustomTextField';

const backgroundImage = './src/assets/background.jpg';

export default function ProductHero() {

  return (
    <MainSearchLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <CustomTypography content={`FC Online의 구단주명을 입력해주세요`} fontSize={'50px'} fontWeight={'bolder'}/>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 }, opacity: "0.7" }}
      >
        정보를 알고 싶은 구단주명을 입력하면 최근 경기에 대한 내용을 확인할 수 있습니다.
      </Typography>
      <CustomTextField>
      </CustomTextField>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </MainSearchLayout>
  );
}