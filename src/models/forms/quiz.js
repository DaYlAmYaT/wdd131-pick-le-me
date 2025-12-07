const questions = {
    "survey": {
        "title": "Pickleball Paddle Style Assessment",
        "description": "Answer these questions to help determine which type of pickleball paddle (Control, Hybrid, or Power) best suits your playing style.",
        "questions": [
            {
                "id": "q1",
                "question_text": "When playing pickleball, what do you enjoy doing most?",
                "options": [
                    {
                        "text": "Placing the ball precisely where your opponent can't reach it.",
                        "score_value": 0
                    },
                    {
                        "text": "Mixing up soft shots with strong drives to keep opponents guessing.",
                        "score_value": 50
                    },
                    {
                        "text": "Hitting powerful shots that overwhelm your opponents.",
                        "score_value": 100
                    },
                    {
                        "text": "Playing defensively and waiting for opponent errors.",
                        "score_value": 20
                    }
                ]
            },
            {
                "id": "q2",
                "question_text": "During a dink rally at the kitchen line, what is your main objective?",
                "options": [
                    {
                        "text": "Maintain control and force your opponent into an uncomfortable position.",
                        "score_value": 0
                    },
                    {
                        "text": "Look for an opportunity to hit a hard drive past your opponent.",
                        "score_value": 90
                    },
                    {
                        "text": "Try to add heavy spin to make the ball harder to return.",
                        "score_value": 60
                    },
                    {
                        "text": "Simply keep the ball in play until an opening appears.",
                        "score_value": 30
                    }
                ]
            },
            {
                "id": "q3",
                "question_text": "How do you typically react to a fast, hard shot coming at you?",
                "options": [
                    {
                        "text": "I try to soften the ball and drop it into the kitchen to reset the rally.",
                        "score_value": 0
                    },
                    {
                        "text": "I try to block or counter-punch it back with equal or more force.",
                        "score_value": 90
                    },
                    {
                        "text": "I focus on getting my paddle on the ball and just sending it back.",
                        "score_value": 40
                    },
                    {
                        "text": "I try to redirect it with spin to make it awkward for them.",
                        "score_value": 70
                    }
                ]
            },
            {
                "id": "q4",
                "question_text": "When you're trying to win a point, what is your preferred method?",
                "options": [
                    {
                        "text": "Outmaneuver my opponents with precise placement and strategic dinks until I get an easy put-away.",
                        "score_value": 0
                    },
                    {
                        "text": "Hit winners with powerful drives and smashes.",
                        "score_value": 100
                    },
                    {
                        "text": "Combine soft, controlled shots with occasional powerful attacks to keep opponents off balance.",
                        "score_value": 50
                    },
                    {
                        "text": "Wait for my opponent to make an unforced error.",
                        "score_value": 20
                    }
                ]
            },
            {
                "id": "q5",
                "question_text": "How important is 'feel' (the tactile feedback from the ball hitting the paddle) in your game?",
                "options": [
                    {
                        "text": "Extremely important; I need to feel the ball for precise drops and dinks.",
                        "score_value": 0
                    },
                    {
                        "text": "Moderately important; I like some feel, but power is also a factor.",
                        "score_value": 40
                    },
                    {
                        "text": "Not very important; I prioritize generating power.",
                        "score_value": 90
                    }
                ]
            },
            {
                "id": "q6",
                "question_text": "How would you describe your typical swing speed and power?",
                "options": [
                    {
                        "text": "Moderate to slow, focusing on control and placement.",
                        "score_value": 10
                    },
                    {
                        "text": "Fast and aggressive, aiming for maximum ball speed.",
                        "score_value": 90
                    },
                    {
                        "text": "Variable, I can adjust between soft and powerful swings.",
                        "score_value": 50
                    }
                ]
            },
            {
                "id": "q7",
                "question_text": "When serving, what is your primary goal?",
                "options": [
                    {
                        "text": "Serve consistently and place the ball accurately.",
                        "score_value": 10
                    },
                    {
                        "text": "Hit the ball with maximum power and spin.",
                        "score_value": 90
                    },
                    {
                        "text": "A good blend of power and consistency.",
                        "score_value": 50
                    }
                ]
            },
            {
                "id": "q8",
                "question_text": "What kind of opponent do you generally find most challenging?",
                "options": [
                    {
                        "text": "An opponent with exceptional touch and dinking skills.",
                        "score_value": 70
                    },
                    {
                        "text": "An opponent who hits very hard and fast.",
                        "score_value": 30
                    },
                    {
                        "text": "An opponent with a very unpredictable and adaptable game.",
                        "score_value": 50
                    }
                ]
            }
        ]
    },
    "scoring_mechanism_explanation": {
        "title": "How Your Paddle Style is Determined (Scoring Mechanism)",
        "description": "This survey uses a simple scoring system to quantify your playing style preferences, ranging from 0 (pure control) to 100 (pure power).",
        "how_it_works": [
            "Each answer option in the survey has an associated 'score_value' (from 0 to 100).",
            "**Lower scores (closer to 0)** indicate a preference for **Control** (e.g., valuing precision, feel, soft game).",
            "**Higher scores (closer to 100)** indicate a preference for **Power** (e.g., valuing aggressive drives, speed, overwhelming opponents).",
            "**Mid-range scores (around 50)** indicate a preference for a **Hybrid** or balanced playing style.",
            "To determine your paddle type, simply sum up the 'score_value' of your chosen answers for all questions.",
            "Divide your total score by the number of questions to get your **Average Style Score**.",
            "**Paddle Recommendation Ranges (Average Style Score):**",
            {
                "range": "0 - 35",
                "paddle_type": "Control Paddle",
                "description": "You prioritize touch, precision, and strategy. A Control paddle will give you excellent feel and consistency for dinks, drops, and resets, helping you to outmaneuver opponents."
            },
            {
                "range": "36 - 65",
                "paddle_type": "Hybrid Paddle",
                "description": "You enjoy a versatile game, blending finesse with effective power. A Hybrid paddle will offer a balanced feel, allowing you to execute both soft shots and powerful attacks effectively."
            },
            {
                "range": "66 - 100",
                "paddle_type": "Power Paddle",
                "description": "You prefer to hit hard, dominate rallies, and win points with aggressive drives and smashes. A Power paddle will provide the raw force and speed you need to overwhelm your opponents."
            }
        ],
        "example_calculation": "If you answered 3 questions and got scores of 0, 50, and 100, your total would be 150. Your average would be 150 / 3 = 50. This would suggest a Hybrid paddle."
    }
}

export const getQuestions = () => {
    return questions;
}