import { useEffect } from 'react';
import { APP_NAME } from '../constants';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
}

const useSEO = ({ title, description, keywords }: SEOProps) => {
    useEffect(() => {
        // Update Title
        const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
        document.title = fullTitle;

        // Update Meta Description
        if (description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', description);
        }

        // Update Meta Keywords
        if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.setAttribute('name', 'keywords');
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', keywords);
        }
    }, [title, description, keywords]);
};

export default useSEO;
