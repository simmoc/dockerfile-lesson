<?php

return [

    'midwares' => [
        'default' => 'local',
        'queue' => 'local',
    ],

    'resources' => [
        'local' => [
            'host' => 'beanstalkd',
            'port' => 11300,
            'timeout' => 1,
        ],
    ],
];
