import handler from '../contact.js';

export default function dynamicHandler(req, res) {
  // If id is in URL params (e.g. /api/contact/123), attach to query
  if (req.query && req.query.id) {
    // already set
  }
  return handler(req, res);
}
