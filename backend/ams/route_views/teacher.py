@api_view(['POST'])
def admin_teacher_Add(request):
    data = json.loads(request.body)
    email = data.get('email')
    
    if not MSI.verify_registered_email(email):
        response = admin_teacher_Add(email)
        if not response:
            return JsonResponse({"Status":False,'message': 'server error'}, status=501)
        else:
            return JsonResponse({"Status":True,'message': 'Successfully added'}, status=200)
    else:

        return JsonResponse({"status":True, 'message': 'already exist'}, status=200)



@api_view(['POST'])
def teacher_Register(request):
    data = json.loads(request.body)
    email = data.get('email')
    
    if not MSI.verify_registered_email(email):
        response = admin_teacher_Add(email)
        if not response:
            return JsonResponse({"Status":False,'message': 'server error'}, status=501)
        else:
            return JsonResponse({"Status":True,'message': 'Successfully added'}, status=200)
    else:

        return JsonResponse({"status":True, 'message': 'already exist'}, status=200)