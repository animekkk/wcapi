import express from 'express';
import { client } from '../../server'
import { sendGQL } from '../../utils/gql';

export const videoRouter = express.Router();

videoRouter.get('/:id', async (request, response) => {
    const id = request.params.id;
    let video = await client.get(`teapi.video.${id}`);
    if(!video) video = await getVideo(id);
    else video = JSON.parse(video);
    response.status(200).json(video);
});

async function getVideo(id) {
    const data = await sendGQL('NielsenContentMetadata', '2dbf505ee929438369e68e72319d1106bb3c142e295332fac157c90638968586',
        {collectionID: "", isCollectionContent: false, isLiveContent: false, isVODContent: true, login: "", vodID: id });
    if(!data?.data.video) return;
    const videos = { data: [ data.data.video ]};
    videos.data[0].created_at = data.data.video.createdAt;
    return videos;
    // const data = await fetch(`https://api.twitch.tv/helix/videos?id=${id}`, {
    //     headers: {
    //         'Authorization': `Bearer ${process.env.TWITCH_TOKEN}`,
    //         'Client-Id': process.env.TWITCH_ID
    //     }
    // });
    // const json = await data.json();
    // if(data.status !== 400) {
    //     client.setEx(`teapi.video.${id}`, 300, JSON.stringify(json));
    // }
    // return json;
}