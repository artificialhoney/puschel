db.createUser({
  user: 'puschel',
  pwd: 'unsecure',
  roles: [
    {
      role: 'readWrite',
      db: 'puschel',
    },
  ],
});
