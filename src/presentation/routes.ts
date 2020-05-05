import express from 'express';
import cors from 'cors';
import { signupEndpoint } from './endpoints/user/signup';
import { loginEndpoint } from './endpoints/user/login';
import { changePasswordEndpoint } from './endpoints/user/changePassword';
import { uploadVideoEndpoint } from './endpoints/video/uploadVideo';
import { getUserVideosEndpoint } from './endpoints/video/getUserVideo';
import { updateVideoEndpoint } from './endpoints/video/updateVideo';
import { deleteVideoEndpoint } from './endpoints/video/deleteVideo';
import { getAllVideosEndpoint } from './endpoints/video/getAllVideos';
import { getVideoDetailsEndpoint } from './endpoints/video/getVideoDetails';
import { refreshAccessTokenEndpoint } from './endpoints/user/refreshAccessToken';
import { createReactionEndpoint } from './endpoints/reaction/createReaction';
import { getUserReactionByVideoEndpoint } from './endpoints/reaction/getUserReactionByVideo';
import { createCommentEndpoint } from './endpoints/comment/createComment';
import { getCommentsByVideoEndpoint } from './endpoints/comment/getCommentsByVideo';

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());

app.post('/signup', signupEndpoint);

app.post('/login', loginEndpoint);

app.post('/changepassword', changePasswordEndpoint);

app.get('/auth/refresh', refreshAccessTokenEndpoint)

app.post('/video/upload', uploadVideoEndpoint);

app.get('/user/videos', getUserVideosEndpoint);

app.post('/video/update', updateVideoEndpoint);

app.post('/video/delete', deleteVideoEndpoint);

app.get('/video/all/:page', getAllVideosEndpoint);

app.get('/video/details/:videoId', getVideoDetailsEndpoint);

app.post('/video/reaction', createReactionEndpoint);

app.get('/video/reaction/user/:videoId', getUserReactionByVideoEndpoint);

app.post('/video/comment', createCommentEndpoint);

app.get('/video/comment/:videoId', getCommentsByVideoEndpoint);

export default app;
