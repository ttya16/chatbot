from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoConfig
from transformers import pipeline


class PosNegClassifier():
    def __init__(self):
        model_checkpoint = 'daigo/bert-base-japanese-sentiment'
        tokenizer_checkpoint = 'cl-tohoku/bert-base-japanese-whole-word-masking'
        self.model = AutoModelForSequenceClassification.from_pretrained(model_checkpoint)
        self.tokenizer = AutoTokenizer.from_pretrained(tokenizer_checkpoint)
        # self.config = AutoConfig.from_pretrained(model_checkpoint)

        self.classifier = pipeline(
            "sentiment-analysis",
            model=self.model,
            tokenizer=self.tokenizer
        )

    def predict(self, texts):
        print("Predicting...")
        preds = self.classifier(texts)
        print(preds)
        return preds[0]