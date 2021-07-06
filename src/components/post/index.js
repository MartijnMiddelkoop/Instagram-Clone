import { useRef } from 'react';
import PropTypes from 'proptypes';
import Header from './header';
import Image from './image';
import Footer from './footer';



export default function Post({ content }) {
    
    
    
    
    return (
           <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <Header username={Content.username} />
            <Image src={Content.imgeSrc} caption={content.caption} />
            <Actions 
            docId={content.docId}
            totalLikes={content.likes.lenght}
            userLikedPhoto={content.userLikedPhoto}
            handleFocus={handleFocus}
            />
            <Footer caption={content.caption} username={content.username} />
           <Comments 
             docId={content.docId}
             comments={content.comments}
             posted={content.dateCreated}
             commentInput={commentInput}
            />
            </div>
    );
}

Post.PropTypes = {
    content: PropTypes.shape({
        username: Proptypes.string.isRequired,
        imgeSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
};