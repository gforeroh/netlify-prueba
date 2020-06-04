import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import BlogPagePreview from './preview-templates/BlogPagePreview';
import AboutUsPreview from './preview-templates/AboutUsPreview'
import LinesOfWorkPreview from './preview-templates/LinesOfWorkPreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('landing', IndexPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('blog-page', BlogPagePreview)
CMS.registerPreviewTemplate('about-us', AboutUsPreview)
CMS.registerPreviewTemplate('lines-of-work', LinesOfWorkPreview)