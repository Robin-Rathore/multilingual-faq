const supportedLanguages = ['en', 'hi', 'bn', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'pa'];

const languageMiddleware = (req, res, next) => {
  const lang = req.query.lang || 'en';
  
  if (!supportedLanguages.includes(lang)) {
    return res.status(400).json({ 
      error: 'Unsupported language',
      supportedLanguages 
    });
  }

  req.language = lang;
  next();
};

module.exports = languageMiddleware;