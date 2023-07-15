import os


class Teste:
  def __init__(self):
    """
    @|table:MY_ID:option: DB_PASS | null | Este variável serve para fazer isso aquilo blabla.
    """
    self.config = os.environ['DB_PASS']
