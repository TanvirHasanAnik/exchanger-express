import sys
import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()
text = sys.argv[1]
scores = analyzer.polarity_scores(text)
print(json.dumps(scores))
