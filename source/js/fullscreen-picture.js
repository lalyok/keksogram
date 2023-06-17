import { isEscapePushed } from './util.js';

const MAX_COMMENTS_AT_ONCE = 5;
const fullscreenPreview = document.querySelector('.big-picture');
const fullscreenCloseButton = document.querySelector('.big-picture__cancel');
const commentsLoader = fullscreenPreview.querySelector('.comments-loader');

const addComments = (comments) => {
  const commentsList = fullscreenPreview.querySelector('.social__comments');
  const commentTemplate = fullscreenPreview.querySelector('.social__comment');
  const currentCommentsCounter = fullscreenPreview.querySelector('.comments--current-count');

  for (let i = commentsList.children.length - 1; i >= 0; i--) {
    const child = commentsList.children[i];
    commentsList.removeChild(child);
  }

  let commentsBlock = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;

    commentsBlock.appendChild(newComment);
  });

  const renderComments = () => {
    if (commentsBlock.children.length <= MAX_COMMENTS_AT_ONCE) {
      commentsList.appendChild(commentsBlock);
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', renderComments);
    } else {
      commentsLoader.classList.remove('hidden');
      for (let i = 0; i < MAX_COMMENTS_AT_ONCE; i++) {
        commentsList.appendChild(commentsBlock.children[0]);
      }
    }
    currentCommentsCounter.textContent = commentsList.children.length.toString();
  }

  renderComments();
  commentsLoader.addEventListener('click', renderComments);
};

const closeFullscreenPreview = () => {
  fullscreenPreview.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  fullscreenCloseButton.removeEventListener('click', closeFullscreenPreview);
  document.removeEventListener('keydown', addcloseFullscreenPreviewHandler);
}

const addcloseFullscreenPreviewHandler = (evt) => {
  if (isEscapePushed(evt)) {
    closeFullscreenPreview();
  }
};

const showFullscreen = (pictureItem) => {
  fullscreenPreview.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  fullscreenPreview.querySelector('.big-picture__img img').src = pictureItem.url;
  fullscreenPreview.querySelector('.likes-count').textContent = pictureItem.likes;
  fullscreenPreview.querySelector('.social__caption').textContent = pictureItem.description;
  fullscreenPreview.querySelector('.comments-count').textContent = pictureItem.comments.length;
  fullscreenPreview.querySelector('.comments-count').textContent = pictureItem.comments.length;

  addComments(pictureItem.comments);

  fullscreenCloseButton.addEventListener('click', closeFullscreenPreview);
  document.addEventListener('keydown', addcloseFullscreenPreviewHandler);
};

export { showFullscreen };
