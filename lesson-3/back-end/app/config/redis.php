<?php

return [

    'midwares' => [
        'default' => 'local',
        'idgenter' => 'local',
        'lock' => 'local',
    ],

    'resources' => [
        'local' => [
            //
            // Create connection with:
            // 'sock' => '/var/run/redis.sock',
            // Or
            //  'host' => '127.0.0.1',
            //  'port' => 6379,
            //

            'host' => 'redis-db',
            'port' => 6379,

            'timeout' => 1,

            // Authenticate the connection using a password:
            // 'database' => 0,

            //
            // Authenticate the connection using a password:
            // 'auth' => 'foobared',

            'options' => [
                Redis::OPT_SERIALIZER => Redis::SERIALIZER_PHP,
            ],
        ],
    ],
];
