const mongoose = require('mongoose');

function arrayLimit(val) {
    return val.length <= 5;
}

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    planner: {
        monday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                            required: true
                        },
                        name: {
                            type: String,
                            required: true
                        },
                        spoon_id: {
                            type: Number,
                            required: true
                        },
                        quantity: {
                            type: Number,
                            required: true
                        }
                    }
                ]
            }
        ],
        tuesday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                            required: true
                        },
                        name: {
                            type: String,
                            required: true
                        },
                        spoon_id: {
                            type: Number,
                            required: true
                        },
                        quantity: {
                            type: Number,
                            required: true
                        }
                    }
                ]
            }
        ],
        wednesday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                            required: true
                        },
                        name: {
                            type: String,
                            required: true
                        },
                        spoon_id: {
                            type: Number,
                            required: true
                        },
                        quantity: {
                            type: Number,
                            required: true
                        }
                    }
                ]
            }
        ],
        thursday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                            required: true
                        },
                        name: {
                            type: String,
                            required: true
                        },
                        spoon_id: {
                            type: Number,
                            required: true
                        },
                        quantity: {
                            type: Number,
                            required: true
                        }
                    }
                ]
            }
        ],
        friday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                            required: true
                        },
                        name: {
                            type: String,
                            required: true
                        },
                        spoon_id: {
                            type: Number,
                            required: true
                        },
                        quantity: {
                            type: Number,
                            required: true
                        }
                    }
                ]
            }
        ],
        saturday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                            required: true
                        },
                        name: {
                            type: String,
                            required: true
                        },
                        spoon_id: {
                            type: Number,
                            required: true
                        },
                        quantity: {
                            type: Number,
                            required: true
                        }
                    }
                ]
            }
        ],
        sunday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                            required: true
                        },
                        name: {
                            type: String,
                            required: true
                        },
                        spoon_id: {
                            type: Number,
                            required: true
                        },
                        quantity: {
                            type: Number,
                            required: true
                        }
                    }
                ]
            }
        ],
        date: {
            type: Date,
            default: Date.now
        }
    },
    inventory: [
        {
            ingredient_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ingredients',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            spoon_id: {
                type: Number,
                required: true
            }
        }
    ],
    grocery: [
        {
            ingredient_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ingredients',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            spoon_id: {
                type: Number,
                required: true
            }
        }
    ],
    favourites: [
        {
            recipe_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes',
                required: true
            },
            title: {
                type: String,
                required: true
            },
            ingredients: [
                {
                    ingredient_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'ingredients',
                        required: true
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    spoon_id: {
                        type: Number,
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    }
                }
            ]
        }
    ],
    tags: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

function date_setter() {
    let curr = new Date;
    let week = []

    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i;
        let day = new Date(curr.setDate(first))
        week.push(day)
        console.log(day.getDay())
    
    }
    console.log(week)
    
}

module.exports = Profile = mongoose.model('profile', ProfileSchema);