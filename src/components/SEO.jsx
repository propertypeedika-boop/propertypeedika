const SEO = ({ title, description, image, url }) => {
    const siteTitle = 'PropertyPeedika';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || 'Find your dream property with PropertyPeedika. The best real estate listings in Kerala.';
    const metaImage = image || 'https://propertypeedika.in/og-image.jpg'; // Absolute URL is better for OG
    const metaUrl = url || window.location.href;

    // React 19 automatically hoists these to the <head>
    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={metaUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />
        </>
    );
};

export default SEO;
