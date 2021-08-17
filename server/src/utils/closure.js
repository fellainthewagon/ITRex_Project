module.exports = function closure(db, dbName, exception, Consrtuctor) {
  return () => new Consrtuctor(db, dbName, exception);
};
