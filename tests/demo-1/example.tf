module "security-groups" {
  source = "/sg-group"

  // @|code:start(language=terraform, startfrom=2)
  ingress = [
    {
      from = "8000"
      to = "8000"

      ips = [
        "127.0.0.0",
        "127.0.0.1",
        "127.0.0.2",
        "127.0.0.3",
      ]
    }
  ]
  // @|code:end
}

