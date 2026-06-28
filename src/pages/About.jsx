export default function About({ about }) {
  return (
    <div className="container section">
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>
        {about?.heading || 'About Pawar Online Retail LLP'}
      </h1>
      <p style={{ fontSize: 17, color: '#333', maxWidth: 720, whiteSpace: 'pre-wrap' }}>
        {about?.body ||
          'We curate quality everyday products and list them for purchase through Amazon.'}
      </p>
    </div>
  );
}
