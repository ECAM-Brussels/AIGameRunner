import cherrypy

class Server:
    @cherrypy.expose
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def move(self):
        body = cherrypy.request.json
        print(body)
        return {"move": 1}

cherrypy.quickstart(Server())