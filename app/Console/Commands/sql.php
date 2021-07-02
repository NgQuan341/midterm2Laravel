<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class sql extends Command
{
    protected $signature = 'sql:createdb {name?}';

    protected $description = 'Create a new sql database schema based on the database config file';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $schemaName = $this->argument('name') ?: config("database.connections.sql.database");
        $charset = config("database.connections.sql.charset",'utf8mb4');
        $collation = config("database.connections.sql.collation",'utf8mb4_unicode_ci');

        config(["database.connections.sql.database" => null]);

        $query = "CREATE DATABASE IF NOT EXISTS $schemaName CHARACTER SET $charset COLLATE $collation;";

        DB::statement($query);

        config(["database.connections.sql.database" => $schemaName]);

    }
}