
exports.up = function(knex, Promise) {
  return Promise.all([
  	   knex.schema.createTableIfNotExists('repos', function(table) {
  	      
  	      table.string('name');
  	      table.string('username');
  	      table.integer('stargazers');

  	  })
  	])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
  		knex.schema.dropTable('repos')
  	])
};
